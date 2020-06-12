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
    enterMail: `please enter email`,
    enterPass: `password`,
    login: `log in`,
    
    
  //main user page
    about: `Na'amat is a Movement for the advancement of the Status of Women and the Social Force for women in Israel. Na'amat’s top priority is to advance and strengthen the status of women in the family and in the work force. Na'amat is striving to achieve equality between the sexes and full participation of women in social, economic and political spheres. Na'amat, previously called Moetzet Hapoalot (Council of Working Women), was established in 1921 by young working women, pioneers who came to Palestine in the early 1920’s. Moetzet Hapoalot was organized as an autonomous movement with affiliation to the Histadrut (The General Federation of Labor). Today Na'amat is a non-profit organization, a socio-political, multi-party women’s movement comprised of women from diverse sectors of the population, communities, countries of origin and religious streams.`,
    aboutTitle: "about Na'amat",
    feedback: `visit feedback`,
    categories: `categories`,
    search: `search`,
    addWoman: `add woman`,
    
    
    //forms
    name: `name`,
    bday: `date of birth`,
    submit:`submit`, 
    dethDay: `Date of death`,
    highlights:`Highlights`,
    biography:`Biography`,
    QuotesAnd: `Quotes and notable works`,
    History:`History`,
    Contribution: `Contribution to feminism`,
    facts: `Interesting facts / stories`,
    media: `media`,
    upload: `upload`,
    chooseFile:`Choose file`,
    HowWasVisit:`How was your visit?`,
    seggestions: `seggestions for improvament`,
    close:`close`,
    //components
    
    builders: `This site was built by: Shlomo Carmi, Daniel Raz, Sahar Cohen, Adiel Tsayag, Matan Yemin`,
  },
  HE: {
    //login page
    enterMail: `אנא הכניסי מייל`,
    enterPass: `סיסמא`,
    login: `התחברי`,
    
    
    
  //main user page
    about: `נעמת היא תנועה לקידום מעמד האישה והכוח החברתי לנשים. העדיפות העליונה של נעמת היא קידום וחיזוק מעמד האישה במשפחה ובכוח העבודה. נעמת שואפת להשיג שוויון בין המינים והשתתפות מלאה של נשים בתחומים חברתיים, כלכליים ופוליטיים. נעמת, שכונתה בעבר "מועצת הנשים העובדות", הוקמה בשנת 1921 על ידי נשים עובדות, חלוצות שהגיעו לארץ ישראל בראשית שנות העשרים. מוצת הפועלות הייתה מאורגנת כתנועה אוטונומית עם שיוך להסתדרות (הסתדרות העובדים הכללית). כיום נעמת היא ארגון ללא מטרות רווח, תנועת נשים סוציו-פוליטית ורב-מפלגתית המורכבת מנשים ממגזרים שונים באוכלוסייה, קהילות, ארצות מוצא וזרמים דתיים.`,
    aboutTitle: `אודות נעמת`,
    feedback: ` משוב ביקור`,
    categories: `קטגוריות`,
    search: `חיפוש`,
    addWoman: `הוסיפי אישה`,
    
    //forms
    name: `שם`,
    bday: `תאריך לידה`,
    submit:`שלח`,
    dethDay: `יום פטירה`,
    highlights:`תקציר`,
    biography:`ביוגרפיה`,
    QuotesAnd: `ציטוטים ויצירות בולטות`,
    History:`היסטוריה`,
    Contribution: `תרומה לפמיניזם`,
    facts: `עובדות / סיפורים מעניינים`,
    media: `מדיה`,
    upload: `העלי`,
    chooseFile:`בחרי קובץ`,
    HowWasVisit:`איך היה הביקור שלך?`,
    seggestions: `הצעות לשיפור`,
    close:`סגרי`,
    //components
    builders: 'אתר זה נבנה על ידי: שלמה כרמי, דניאל רז, סהר כהן, עדיאל צייג, מתן ימין',
    
   
  },
  AR: {
    //login page
    enterMail: "يرجى إدخال بريد إلكتروني",
    enterPass: "كلمه السر",
    login: "تسجيل الدخول",
    
    
    
  //main user page
  about: "نعمات هي حركة من أجل النهوض بوضع المرأة والقوة الاجتماعية للمرأة في إسرائيل. أولوية نعمة هي تعزيز وتعزيز مكانة المرأة في الأسرة وفي القوى العاملة. تسعى نعمة إلى تحقيق المساواة بين الجنسين والمشاركة الكاملة للمرأة في المجالات الاجتماعية والاقتصادية والسياسية. تم تأسيس نعمة ، التي كانت تسمى سابقًا Moetzet Hapoalot (مجلس النساء العاملات) ، في عام 1921 على يد شابات رائدات جاءن إلى فلسطين في أوائل عشرينيات القرن العشرين. تم تنظيم Moetzet Hapoalot كحركة مستقلة مع الانتماء إلى الهستدروت (الاتحاد العام للعمل). نعمة اليوم هي منظمة غير ربحية ، وهي حركة نسائية سياسية اجتماعية متعددة الأحزاب تتألف من نساء من قطاعات متنوعة من السكان والمجتمعات المحلية وبلدان الأصل والتيارات الدينية.",
  aboutTitle: "عن نعمة",
  feedback: `زيارة الملاحظات`,
    categories: `التصنيفات`,
    search: `بحث`,
    addWoman: `أضف امرأة`,
    
    
    //forms
    name: `اسم`,
    bday: `تاريخ الولاده`,
    submit:`إرسال`, 
    dethDay:`تاريخ الوفاة`,
    highlights:`تسليط الضوء`,
    biography:`سيرة شخصية`,
    QuotesAnd: `اقتباسات وأعمال بارزة`,
    History:`التاريخ`,
    Contribution: `المساهمة في الحركة النسائية`,
    facts: `حقائق / قصص مثيرة للاهتمام`,
    media: `وسائل الإعلام`,
    upload: `رفع`,
    chooseFile:`اختر ملف`,
    HowWasVisit:`كيف كانت زيارتك؟`,
    seggestions: `عمليات الإرتجال`,
    close:`أغلق`,
    //components
    
    builders: `تم بناء هذا الموقع من قبل: شلومو كرمي ، دانيال راز ، سحر كوهين ، أديل تساياج ، ماتان يمين `,
    
    //woman page

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


