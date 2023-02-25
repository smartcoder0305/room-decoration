import './style.css';

const ShipReturn = () => {
  return (
  <div className='aboutus_shipreturn_mobile'>
    <div className='aboutus_shipreturn_mobile_table'>
      <div className='aboutus_shipreturn_mobile_table_row' style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
        <span className='aboutus_shipreturn_mobile_table_row_item shipreturn_bold'>עלות משלוח<br />מ130 שח ומעלה</span>
        <span className='aboutus_shipreturn_mobile_table_row_item shipreturn_bold'>זמן אספקה</span>
      </div>
      <div className='aboutus_shipreturn_mobile_table_row' style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
        <span className='aboutus_shipreturn_mobile_table_row_item'>חינם</span>
        <span className='aboutus_shipreturn_mobile_table_row_item'>3-7 ימי עסקים</span>
      </div>
    </div>
    <div className='aboutus_shipreturn_mobile_table'>
      <div className='aboutus_shipreturn_mobile_table_row' style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
        <span className='aboutus_shipreturn_mobile_table_row_item shipreturn_bold'>חברת שילוח</span>
        <span className='aboutus_shipreturn_mobile_table_row_item shipreturn_bold'>עלות משלוח<br />מתחת ל130 שח</span>
      </div>
      <div className='aboutus_shipreturn_mobile_table_row' style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
        <span className='aboutus_shipreturn_mobile_table_row_item'>דואר ישראל</span>
        <span className='aboutus_shipreturn_mobile_table_row_item'>29.90 שח</span>
      </div>
    </div>
    <div style={{direction: "rtl", marginTop: "27px"}}>
    * החל מרגע אישור ההזמנה בחברת האשראי, בימי עסקים בלבד (ימים א'- ה') ערבי חג, ימי ו' ,שבת וחגים אינם נחשבים ימי עסקים.<br/>
משלוח עד הבית באמצעות חברת דואר ישראל בהתאם לזמני האספקה של דואר שליחים.<br/>
<br/>
*** לישובים מרוחקים 3-6 ימי עסקים נוספים, רשימת היישובים מתעדכנת מעת לעת והיא מתפרסמת באתר האינטרנט של דואר ישראל. ט.ל.ח.<br/>

    </div>
  </div>
  )
}

export default ShipReturn;