import React from 'react';
import LocalizedStrings from 'react-localization';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import "./Dictionary.css"
import globe from './images/globe.png'



/* LocalizedStrings is holding our Dictionary so that all of the pages wiil be able to be translated.
to set a language you can call 'Dictionart.setLanguage([the language])'
all pages can reference the text with 'Dictionery.[reference]
the references were devided to the main pages that is using them*/
export const Dictionary = new LocalizedStrings({
  EN: {
    //login page
    enterMail: `Please enter email`,
    enterPass: `Password`,
    login: `Log in`,
    
    //admin page
    adminAddWoman: 'Add Woman',
    adminEditWoman: 'Edit Woman',
    adminFeedback: 'Watch Feedback',
    adminEditAbout: 'Edit About',
    adminAddCategory: 'Add Category',
    adminUserManagement: 'Users Management',
    welcomeManager: `Welcome to the management platform`,
    manageCategory: `manage Category`,
    addUserBtn: `Add User`,
    userAddedSuccefully:`New User Added Succefully`,
    
    

  //woman page
  edit: 'Edit',
  //main user page
    about: `Na'amat is a Movement for the advancement of the Status of Women and the Social Force for women in Israel. Na'amat’s top priority is to advance and strengthen the status of women in the family and in the work force. Na'amat is striving to achieve equality between the sexes and full participation of women in social, economic and political spheres. Na'amat, previously called Moetzet Hapoalot (Council of Working Women), was established in 1921 by young working women, pioneers who came to Palestine in the early 1920’s. Moetzet Hapoalot was organized as an autonomous movement with affiliation to the Histadrut (The General Federation of Labor). Today Na'amat is a non-profit organization, a socio-political, multi-party women’s movement comprised of women from diverse sectors of the population, communities, countries of origin and religious streams.`,
    aboutTitle: "About Na'amat",
    feedback: `Visit feedback`,
    categories: `Categories`,
    search: `Search`,
    addWoman: `Add woman`,
    addcategory: `add category`,
    
    //forms
    name: `Full Name`,
    displayname:"display name",
    birth: `Date of birth`,
    submit:`Submit`, 
    death: `Date of death`,
    highlights:`Highlights`,
    biography:`Biography`,
    quotes: `Quotes and notable works`,
    History:`History`,
    feminism: `Contribution to feminism`,
    facts: `Interesting facts / stories`,
    media: `Media`,
    upload: `Upload`,
    chooseFile:`Choose file`,
    HowWasVisit:`How was your visit?`,
    seggestions: `Seggestions for improvament`,
    close:`Close`,
    profilepic:'Profile Picture',
    anotherpictures:'Another Pictures',
    mustfilled:' required field *',
    delete: `delete`,
    next: 'next',
    suggest: `suggest woman`,
    popup:'Please fill all details',
    editExistVal:'Do you want to edit exist value?',
    action:`action`,
    deletedSuccessfully: "deleted successfully",
    addMore:"add more",
    
    //components
    
    builders: `This site was built by: Shlomo Carmi, Daniel Raz, Sahar Cohen, Adiel Tsayag, Matan Yemin`,
    managmentPlatform:'Managment Platform',
    NaamatInFacebook: 'Naamat in Facebook',
    NaamatInYoutube: 'Naamat in Youtube',
    email:'Email',
    back: 'Back',
    areYouSure: 'Are you sure?',
    error: 'Error',
    uploadSuccess:'File Uploaded successfully',
    score:'score',
    improvement:'improvement',

  },
  HE: {
    //login page
    enterMail: `אנא הכניסי מייל`,
    enterPass: `סיסמא`,
    login: `התחברי`,
    

    //admin page
    adminAddWoman: 'הוסיפי אישה',
    adminEditWoman: 'ערכי אישה',
    adminFeedback: 'צפייה במשובים',
    adminEditAbout: 'עריכת אודות',
    adminAddCategory: 'הוסף קטגוריה',
    adminUserManagement: 'ניהול משתמשים',
    welcomeManager: `ברוכים הבאים למערכת הניהול`,
    manageCategory: `נהל קטגוריות`,
    addUserBtn: `הוסיפי משתמש`,
    userAddedSuccefully:`משתמש חדש נוסף בהצלחה`,
    
  //woman page
  edit: 'ערוך',
  //main user page
    about: `נעמת היא תנועה לקידום מעמד האישה והכוח החברתי לנשים. העדיפות העליונה של נעמת היא קידום וחיזוק מעמד האישה במשפחה ובכוח העבודה. נעמת שואפת להשיג שוויון בין המינים והשתתפות מלאה של נשים בתחומים חברתיים, כלכליים ופוליטיים. נעמת, שכונתה בעבר "מועצת הנשים העובדות", הוקמה בשנת 1921 על ידי נשים עובדות, חלוצות שהגיעו לארץ ישראל בראשית שנות העשרים. מוצת הפועלות הייתה מאורגנת כתנועה אוטונומית עם שיוך להסתדרות (הסתדרות העובדים הכללית). כיום נעמת היא ארגון ללא מטרות רווח, תנועת נשים סוציו-פוליטית ורב-מפלגתית המורכבת מנשים ממגזרים שונים באוכלוסייה, קהילות, ארצות מוצא וזרמים דתיים.`,
    aboutTitle: `אודות נעמת`,
    feedback: ` משוב ביקור`,
    categories: `קטגוריות`,
    search: `חיפוש`,
    addWoman: `הוסיפי אישה`,
    addcategory: `הוסיפי קטגוריה`,
    
    //forms
    name: `שם מלא`,
    displayname:"שם תצוגה",
    birth: `תאריך לידה`,
    submit:`שלח`,
    death: `תאריך פטירה`,
    highlights:`תקציר`,
    biography:`ביוגרפיה`,
    quotes: `ציטוטים ויצירות בולטות`,
    History:`היסטוריה`,
    feminism: `תרומה לפמיניזם`,
    facts: `עובדות / סיפורים מעניינים`,
    media: `מדיה`,
    upload: `העלי`,
    chooseFile:`בחרי קובץ`,
    HowWasVisit:`איך היה הביקור שלך?`,
    seggestions: `הצעות לשיפור`,
    close:`סגרי`,
    profilepic:'תמונת פרופיל',
    anotherpictures:'תמונות נוספות',
    mustfilled:'* שדות חובה',
    delete: `מחקי`,
    next: 'הבא',
    suggest: `הציעי אישה`,
    action:`פעולה`,
    deletedSuccessfully: "נמחק בהצלחה",
   
    //components
    builders: 'אתר זה נבנה על ידי: שלמה כרמי, דניאל רז, סהר כהן, עדיאל צייג, מתן ימין',
    CategoryName:'שם קטגוריה',
    managmentPlatform: 'ממשק ניהול',
    NaamatInFacebook: 'נעמת בפייסבוק',
    NaamatInYoutube: 'נעמת ביוטיוב',
    email: 'מייל',
    back: 'חזור',
    areYouSure: 'האם אתה בטוח ?',
    error: 'שגיאה',
    uploadSuccess:'ההעלאה הסתיימה בהצלחה',
    popup:'בבקשה מלא את כל הפרטים',
    editExistVal:'האם תרצה לערוך ערך קיים?',
    score:'דירוג',
    improvement:'הצעות לשיפור',
    addMore:"הוסיפי עוד",

   
  },
  AR: {
    //login page
    enterMail: "يرجى إدخال بريد إلكتروني",
    enterPass: "كلمه السر",
    login: "تسجيل الدخول",
    
    
    //admin page
    adminAddWoman: 'أضف امرأة',
    adminEditWoman: 'تحرير المرأة',
    adminFeedback: 'ردود الفعل',
    adminEditAbout: 'تحرير حول',
    adminAddCategory: 'إضافة فئة',
    adminUserManagement: 'إدارةالمستخدم',
    welcomeManager: `مرحبا بكم في نظام الإدارة`,
    manageCategory: `إدارة الفئة`,
    addUserBtn:`إضافة مستخدم`,
    userAddedSuccefully:`تمت إضافة مستخدم جديد بنجاح`,

   //woman page
   edit: 'تعديل',
  //main user page
  about: "نعمات هي حركة من أجل النهوض بوضع المرأة والقوة الاجتماعية للمرأة في إسرائيل. أولوية نعمة هي تعزيز وتعزيز مكانة المرأة في الأسرة وفي القوى العاملة. تسعى نعمة إلى تحقيق المساواة بين الجنسين والمشاركة الكاملة للمرأة في المجالات الاجتماعية والاقتصادية والسياسية. تم تأسيس نعمة ، التي كانت تسمى سابقًا Moetzet Hapoalot (مجلس النساء العاملات) ، في عام 1921 على يد شابات رائدات جاءن إلى فلسطين في أوائل عشرينيات القرن العشرين. تم تنظيم Moetzet Hapoalot كحركة مستقلة مع الانتماء إلى الهستدروت (الاتحاد العام للعمل). نعمة اليوم هي منظمة غير ربحية ، وهي حركة نسائية سياسية اجتماعية متعددة الأحزاب تتألف من نساء من قطاعات متنوعة من السكان والمجتمعات المحلية وبلدان الأصل والتيارات الدينية.",
  aboutTitle: "عن نعمة",
  feedback: `زيارة الملاحظات`,
    categories: `التصنيفات`,
    search: `بحث`,
    addWoman: `أضف امرأة`,
    addcategory: `إضافة فئة`,
    
    //forms
    name: `اسم`,
    birth: `تاريخ الولاده`,
    submit:`إرسال`, 
    death:`تاريخ الوفاة`,
    highlights:`تسليط الضوء`,
    biography:`سيرة شخصية`,
    quotes: `اقتباسات وأعمال بارزة`,
    History:`التاريخ`,
    feminism: `المساهمة في الحركة النسائية`,
    facts: `حقائق / قصص مثيرة للاهتمام`,
    media: `وسائل الإعلام`,
    upload: `رفع`,
    chooseFile:`اختر ملف`,
    HowWasVisit:`كيف كانت زيارتك؟`,
    seggestions: `عمليات الإرتجال`,
    close:`أغلق`,
    profilepic:'الصوره الشخصيه',
    anotherpictures:'صور أخرى',
    mustfilled:' يتطلب حقلا *',
    delete: `حذف`,
    displayname:"اسم العرض",
    next: 'التالى',
    suggest: `توحي امرأة`,
    popup:'يرجى ملء جميع التفاصيل',
    editExistVal:'هل تريد تحرير القيمة الموجودة؟',
    action:`عمل`,
    nothingToShow:"لا يوجد شيء لإظهاره",
    deletedSuccessfully: "حذف بنجاح",
    //components
    
    builders: `تم بناء هذا الموقع من قبل: شلومو كرمي ، دانيال راز ، سحر كوهين ، أديل تساياج ، ماتان يمين `,
    managmentPlatform: 'منصة الإدارة',
    NaamatInFacebook:  'نعمات في الفيسبك', 
    NaamatInYoutube: 'نعمات في اليوتيوب',
    email:'البريد الإلكتروني',
    back: 'عودة',
    areYouSure:'?هل أنت واثق',
    error: 'خطأ',
    uploadSuccess:'تم الرفع بنجاح',
    score:'أحرز هدفا',
    improvement:'تحسين',
    addMore:"أضف المزيد",

    
    
    

  },
});
//language array
export const langs = ["HE", "EN", "AR"];

//set language that is in the session Storage
var language = sessionStorage.getItem("current_language");
if (language === null) {
  language = langs[0];
}
Dictionary.setLanguage(language);

//save new language in session storage and reload page
function changeLanguage(lang) {
  return function () {
    sessionStorage.setItem("current_language", lang);
    window.location.reload();
  }
}

//sets a globe image with three language buttons 
export const LangBtn = () => {

  return (
    <div id="languages">
      <Dropdown >
        <DropdownTrigger><img src={globe} id="globus" alt="lang" /></DropdownTrigger>
        <DropdownContent>

          <ul id="langlist">
            <li>
              <button className="langButtons " onClick={changeLanguage("HE")}>עברית</button>
            </li>
            <li>
              <button className="langButtons " onClick={changeLanguage("EN")} >English</button>
            </li>
            <li>
              <button className="langButtons " onClick={changeLanguage("AR")}>عربيه</button>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}


