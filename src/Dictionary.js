import React from 'react';
import LocalizedStrings from 'react-localization';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import "./Dictionary.css"
import globe from './images/globe.png'


export const langs = ["HE","EN" , "AR"];
export const Dictionary = new LocalizedStrings({
  EN: {
    enterMail: `please enter email`,
    enterPass: `password`,
    about: `Na'amat is a Movement for the advancement of the Status of Women and the Social Force for women in Israel. Na'amat’s top priority is to advance and strengthen the status of women in the family and in the work force. Na'amat is striving to achieve equality between the sexes and full participation of women in social, economic and political spheres. Na'amat, previously called Moetzet Hapoalot (Council of Working Women), was established in 1921 by young working women, pioneers who came to Palestine in the early 1920’s. Moetzet Hapoalot was organized as an autonomous movement with affiliation to the Histadrut (The General Federation of Labor). Today Na'amat is a non-profit organization, a socio-political, multi-party women’s movement comprised of women from diverse sectors of the population, communities, countries of origin and religious streams.`,
    aboutTitle:"about Na'amat",
    login: `log in`,
    feedback:`feedback`
  },
  HE: {
    enterMail: `אנא הכנס מייל`,
    enterPass: `סיסמא`,
    about: `נעמת היא תנועה לקידום מעמד האישה והכוח החברתי לנשים. העדיפות העליונה של נעמת היא קידום וחיזוק מעמד האישה במשפחה ובכוח העבודה. נעמת שואפת להשיג שוויון בין המינים והשתתפות מלאה של נשים בתחומים חברתיים, כלכליים ופוליטיים. נעמת, שכונתה בעבר "מועצת הנשים העובדות", הוקמה בשנת 1921 על ידי נשים עובדות, חלוצות שהגיעו לארץ ישראל בראשית שנות העשרים. מוצת הפועלות הייתה מאורגנת כתנועה אוטונומית עם שיוך להסתדרות (הסתדרות העובדים הכללית). כיום נעמת היא ארגון ללא מטרות רווח, תנועת נשים סוציו-פוליטית ורב-מפלגתית המורכבת מנשים ממגזרים שונים באוכלוסייה, קהילות, ארצות מוצא וזרמים דתיים.`,
    aboutTitle:"אודות נעמת",
    login: `התחבר`,
    feedback:`משוב`
  },
  AR: {
    enterMail: "يرجى إدخال بريد إلكتروني",
    enterPass: "كلمه السر",
    about: "نعمات هي حركة من أجل النهوض بوضع المرأة والقوة الاجتماعية للمرأة في إسرائيل. أولوية نعمة هي تعزيز وتعزيز مكانة المرأة في الأسرة وفي القوى العاملة. تسعى نعمة إلى تحقيق المساواة بين الجنسين والمشاركة الكاملة للمرأة في المجالات الاجتماعية والاقتصادية والسياسية. تم تأسيس نعمة ، التي كانت تسمى سابقًا Moetzet Hapoalot (مجلس النساء العاملات) ، في عام 1921 على يد شابات رائدات جاءن إلى فلسطين في أوائل عشرينيات القرن العشرين. تم تنظيم Moetzet Hapoalot كحركة مستقلة مع الانتماء إلى الهستدروت (الاتحاد العام للعمل). نعمة اليوم هي منظمة غير ربحية ، وهي حركة نسائية سياسية اجتماعية متعددة الأحزاب تتألف من نساء من قطاعات متنوعة من السكان والمجتمعات المحلية وبلدان الأصل والتيارات الدينية.",
    aboutTitle:"عن نعمة",
    login: "تسجيل الدخول",
    feedback:`ردود الفعل`
  },
});


var language = sessionStorage.getItem("current_language");
if(language === null)
{
  language = langs[0];
}
Dictionary.setLanguage(language);


function changeLanguage(lang)
{
    return function(){
        sessionStorage.setItem("current_language",lang);
        //alert("pop up window are you sure?");
        window.location.reload();
    }
}


export const LangBtn = () => {

  return (
    <div id ="languages">
    <Dropdown >
      <DropdownTrigger><img src={globe} id="globus" alt="lang"  /></DropdownTrigger>
      <DropdownContent>

        <ul>
          <li>
             <button class= "langButtons" onClick ={changeLanguage("HE")}>עברית</button>
          </li>
           <li>
            <button class= "langButtons" onClick=  {changeLanguage("EN")} >English</button>
           </li>
           <li>
             <button class= "langButtons" onClick={changeLanguage("AR")}>عربيه</button>
           </li>
        </ul>
      </DropdownContent>
    </Dropdown>
    </div>
  );
}



