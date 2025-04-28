const express = require('express');
const mysql = require('mysql2/promise');  // استخدام mysql2/promise بدلاً من mysql2
const dotenv = require('dotenv');
const cors = require('cors');  // استيراد مكتبة CORS

dotenv.config(); // لقراءة المتغيرات من ملف .env

const app = express();
const port = process.env.PORT || 5000;

// تفعيل CORS لجميع المسارات
app.use(cors());

// إعداد الاتصال بقاعدة البيانات باستخدام promise
const promisePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// اختبار الاتصال بقاعدة البيانات
promisePool.query('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// إعداد الـ JSON parsing
app.use(express.json());

// نقطة النهاية الأساسية
app.get('/', (req, res) => {
  res.send('Hello, welcome to the restaurant backend!');
});

// استرجاع جميع الوجبات
app.get('/api/meals', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM meals');
    
    // إضافة مسار كامل للصورة إذا كانت مخزنة في public/pic
    const mealsWithFullImagePaths = rows.map(meal => {
      if (meal.pic) {
        meal.pic = `http://localhost:${port}/pic/${meal.pic}`;  // التأكد من أن المسار يتناسب مع مجلد الصور
      }
      return meal;
    });

    res.json(mealsWithFullImagePaths); // إرجاع البيانات كـ JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving meals');
  }
});

// إضافة وجبة جديدة
app.post('/api/meals', async (req, res) => {
  const { name, desc, price, categories, pic, made_by } = req.body;
  if (!name || !desc || !price || !categories || !pic || !made_by) {
    return res.status(400).send('Missing required fields');
  }
  try {
    const query = 'INSERT INTO meals (name, desc, price, categories, pic, made_by) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await promisePool.query(query, [name, desc, price, categories, pic, made_by]);
    res.status(201).json({ id: result.insertId, name, desc, price, categories, pic, made_by });
  } catch (error) {
    console.error('Error adding meal:', error);
    res.status(500).send('Error adding meal');
  }
});

// تحديث وجبة
app.put('/api/meals/:id', async (req, res) => {
  const { id } = req.params;
  const { name, desc, price, categories, pic, made_by } = req.body;
  if (!name || !desc || !price || !categories || !pic || !made_by) {
    return res.status(400).send('Missing required fields');
  }
  try {
    const query = 'UPDATE meals SET name = ?, desc = ?, price = ?, categories = ?, pic = ?, made_by = ? WHERE id = ?';
    const [result] = await promisePool.query(query, [name, desc, price, categories, pic, made_by, id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Meal not found');
    }
    res.status(200).send('Meal updated successfully');
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).send('Error updating meal');
  }
});

// حذف وجبة
app.delete('/api/meals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM meals WHERE id = ?';
    const [result] = await promisePool.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Meal not found');
    }
    res.status(200).send('Meal deleted successfully');
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).send('Error deleting meal');
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
