import React from 'react'
import styles from "../Bages/User_guide.module.css"
import UserTextBox from '../components/UserTextBox'


function User_guide() {
  return (
    <div className={styles.user_guide}>
      <div className='container'>
        <UserTextBox  textValue={"يتيح لك نظام Face Attend تسجيل الحضور والغياب بسهولة باستخدام تقنية التعرف على الوجه. بعد إكمال التسجيل لأول مرة، يمكنك تسجيل الدخول في أي وقت باتباع الخطوات التالية."} />
        <UserTextBox titleValue={"خطوات تسجيل الدخول"} textValue={""} />
        <UserTextBox titleValue={"فتح الموقع 🔹 "} textValue={" قم بفتح متصفح الإنترنت الخاص بك وانتقل إلى رابط Face Attend."} />
        <UserTextBox titleValue={" الانتقال إلى صفحة تسجيل الدخول🔹"} textValue={" من الشريط العلوي، اضغط على خيار Login للدخول إلى النظام."} />
        <UserTextBox titleValue={"التحقق من الوجه عبر الكاميرا🔹"} textValue={"بعد فتح صفحة تسجيل الدخول، سيطلب منك النظام توجيه وجهك نحو الكاميرا."} />
        <UserTextBox titleValue={""} textValue={" تأكد من أن الإضاءة جيدة وأن وجهك واضح في الكاميرا للحصول على أفضل نتيجة."} />
        <UserTextBox titleValue={"التقاط الصورة🔹"} textValue={" بمجرد أن يتم التعرف على وجهك، ستظهر صورتك داخل مربع التسجيل , اضغط على زر Login للمتابعة."} />
        <UserTextBox titleValue={" تأكيد تسجيل الحضور 🔹"} textValue={" إذا تطابقت الصورة مع البيانات المسجلة في قاعدة البيانات، سيتم تسجيل حضورك تلقائيًا. في حالة وجود مشكلة، ستظهر رسالة خطأ، ويمكنك المحاولة مرة أخرى أو التواصل مع الدعم الفني."} />
        <UserTextBox titleValue={"الدعم** الفني🔹"} textValue={"إذا واجهتك أي مشكلة أثناء تسجيل الدخول، يمكنك التواصل مع فريق الدعم الفني عبر البريد الإلكتروني أو الهاتف الموضح في موقع Face Attend📧 البريد الإلكتروني: support@faceattend.com📞 الهاتف: +20 123 456 7890شكراً لاستخدامك Face Attend، ونتمنى لك تجربة سلسة وسهلة! 🚀"} />
      </div>
    </div>
  )
}

export default User_guide