import React, { useState } from "react";
import { Calendar, Users, MapPin } from "lucide-react";

// ⚠️ แทนที่ URL นี้ด้วย Web App URL ที่คุณได้จาก Google Apps Script
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyBbLt9Vd7fiJqgaYqpn8-IziO4-Rs5D9gZOXZRLp26N-YD4PDvCW0WYPRY5X6nkN0Hmw/exec";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    houseNumber: "",
    soi: "",
    road: "",
    subDistrict: "",
    district: "",
    province: "",
    postCode: "",
  });

  const [registrations, setRegistrations] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.houseNumber ||
      !formData.subDistrict ||
      !formData.district ||
      !formData.province ||
      !formData.postCode
    ) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    if (formData.postCode.length !== 5 || !/^\d+$/.test(formData.postCode)) {
      alert("กรุณากรอกรหัสไปรษณีย์ให้ถูกต้อง (5 หลัก)");
      return;
    }

    setIsSubmitting(true);

    try {
      // ส่งข้อมูลไปยัง Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // เพิ่มข้อมูลลงในรายการแสดงผล
      const newRegistration = {
        ...formData,
        id: Date.now(),
        registeredAt: new Date().toLocaleString("th-TH"),
      };

      setRegistrations((prev) => [...prev, newRegistration]);

      // รีเซ็ตฟอร์ม
      setFormData({
        fullName: "",
        houseNumber: "",
        soi: "",
        road: "",
        subDistrict: "",
        district: "",
        province: "",
        postCode: "",
      });

      // แสดงข้อความสำเร็จ
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Workshop 3D Printing
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600 ml-14">
            <MapPin className="w-4 h-4" />
            <p className="text-lg">วันเสาร์ที่ 17 มกราคม 2026</p>
          </div>
        </div>

        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 animate-pulse">
            ✅ ลงทะเบียนสำเร็จ! ข้อมูลถูกบันทึกลง Google Sheets แล้ว
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            ลงทะเบียนเข้าร่วม Workshop
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อ-นามสกุล <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="กรุณากรอกชื่อ-นามสกุล"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  บ้านเลขที่ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="เช่น 123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ซอย
                </label>
                <input
                  type="text"
                  name="soi"
                  value={formData.soi}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="เช่น ซอยสุขุมวิท 21"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ถนน
              </label>
              <input
                type="text"
                name="road"
                value={formData.road}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="เช่น ถนนสุขุมวิท"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  แขวง/ตำบล <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subDistrict"
                  value={formData.subDistrict}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="เช่น คลองเตยเหนือ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เขต/อำเภอ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="เช่น วัฒนา"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  จังหวัด <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="เช่น กรุงเทพมหานคร"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รหัสไปรษณีย์ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="เช่น 10110"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "กำลังบันทึก..." : "ลงทะเบียน"}
            </button>
          </div>
        </div>

        {registrations.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                รายชื่อผู้ลงทะเบียน ({registrations.length} คน)
              </h2>
            </div>

            <div className="space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {reg.fullName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {reg.houseNumber} {reg.soi && `ซอย${reg.soi}`}{" "}
                    {reg.road && `ถนน${reg.road}`}
                    <br />
                    แขวง/ตำบล{reg.subDistrict} เขต/อำเภอ{reg.district}
                    <br />
                    จังหวัด{reg.province} {reg.postCode}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    ลงทะเบียนเมื่อ: {reg.registeredAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
