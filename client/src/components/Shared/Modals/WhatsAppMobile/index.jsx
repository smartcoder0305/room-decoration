
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import { useRecoilState } from 'recoil'
import { aboutUs } from '@atoms';
import './style.css'

const WhatsAppMobile = ({style}) => {
	const modal = useSecondModal();
	const [aboutStatus, setAboutUs] = useRecoilState(aboutUs);
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
						setAboutUs('CQ')
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
					href="https://wa.me/message/PRRDISOYMEUEB1"
				>
					תעבירו אותי לוואצאפ
					<img src="/assets/file/images/whatsapp_icon.png" />
				</a>
			</div>
		</div>
	);
}

export default WhatsAppMobile;