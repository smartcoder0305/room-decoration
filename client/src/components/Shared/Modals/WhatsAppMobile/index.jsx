
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import './style.css'

const WhatsAppMobile = ({style}) => {
	const modal = useSecondModal();
	return (
		<div className="whatsapp_mobile">
			<div className="whatsapp_close" onClick={() => modal('close', 'whatsAppMobile')}>
			&lt;&nbsp;&nbsp;
			חזור
			</div>
			<div className="whatsapp_mobile_header">
			היי :)
			</div>
			<div className="whatsapp_mobile_content">
            אנחנו בבלנדס מעניקים שירות מהיר בוואצאפ בין השעות 08:00-19:30 מידי יום למעט שבתות, לשיחה עם נציג פשוט הקליקו למטה ותועברו לשיחת וואצאפ עם אחד מנציגנו, הוא עלול להיות מעט ביישן אז תגידו לו היי
			</div>
			<div className="whatsapp_mobile_footer">
				<span 
					onClick={() => {
						modal('close', 'whatsAppMobile');
						modal('open', 'aboutUsMobile')
					}}
					style={{cursor: "pointer"}}
				>
					לשאלות ותשובות
				</span>
				&nbsp;&nbsp;&nbsp;
				<a
					className="whatsapp_mobile_link"
					href="https://api.whatsapp_mobile.com/send?phone=524321272&text=%D7%94%D7%99%D7%99%20%D7%91%D7%9C%[…]%20%D7%9C%D7%A9%D7%90%D7%95%D7%9C%20%D7%A9%D7%90%D7%9C%D7%94"
				>
					תעבירו אותי לוואצאפ
					<img src="/assets/file/images/whatsapp_icon.png" />
				</a>
			</div>
		</div>
	);
}

export default WhatsAppMobile;