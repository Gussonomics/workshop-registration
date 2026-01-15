# Workshop 3D Printing Registration System

ระบบลงทะเบียนสำหรับ Workshop 3D Printing วันเสาร์ที่ 17 มกราคม 2026

## โครงสร้างโปรเจค

```
workshop-registration/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## วิธีติดตั้งและรัน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รันในโหมดพัฒนา

```bash
npm start
```

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

### 3. Build สำหรับ Production

```bash
npm run build
```

## วิธี Deploy ขึ้น GitHub Pages

### 1. แก้ไข package.json

เปลี่ยน `YOUR_USERNAME` ใน `homepage` เป็น GitHub username ของคุณ:

```json
"homepage": "https://YOUR_USERNAME.github.io/workshop-registration"
```

### 2. ติดตั้ง gh-pages

```bash
npm install gh-pages --save-dev
```

### 3. Push โค้ดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/workshop-registration.git
git push -u origin main
```

### 4. Deploy

```bash
npm run deploy
```

### 5. ตั้งค่า GitHub Pages

1. ไปที่ Repository Settings
2. เลือก Pages ทางซ้ายมือ
3. Source: เลือก `gh-pages` branch
4. กด Save

เว็บไซต์จะพร้อมใช้งานที่: `https://YOUR_USERNAME.github.io/workshop-registration`

## Features

- ✅ ฟอร์มลงทะเบียนครบทุกช่อง
- ✅ ตรวจสอบข้อมูลที่จำเป็น
- ✅ ตรวจสอบรหัสไปรษณีย์ (5 หลัก)
- ✅ แสดงรายชื่อผู้ลงทะเบียน
- ✅ Responsive Design (ใช้งานได้ทั้งมือถือและคอมพิวเตอร์)

## เทคโนโลยีที่ใช้

- React 18
- Tailwind CSS
- Lucide React (Icons)

## การเชื่อมต่อกับ Google Sheets

### 1. สร้าง Google Sheet

- สร้าง Google Sheet ใหม่
- ตั้งหัวตารางในแถวแรก: ชื่อ-นามสกุล, บ้านเลขที่, ซอย, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์, วันที่ลงทะเบียน

### 2. สร้าง Google Apps Script

- Extensions → Apps Script
- วางโค้ดจากไฟล์ `Code.gs`
- Deploy → New deployment → Web app
- Execute as: Me
- Who has access: Anyone
- คัดลอก Web App URL

### 3. แก้ไขไฟล์ `src/App.js`

แทนที่ `YOUR_WEB_APP_URL_HERE` ด้วย Web App URL ที่คุณได้รับ

```javascript
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

### 4. Deploy ใหม่

```bash
git add .
git commit -m "Add Google Sheets integration"
git push
npm run deploy
```

## หมายเหตุ

ข้อมูลจะถูกบันทึกลง Google Sheets ทันทีเมื่อลงทะเบียน และแสดงผลในหน้าเว็บด้วย
