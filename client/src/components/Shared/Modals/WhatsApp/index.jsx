
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import { useRecoilState } from 'recoil'
import { aboutUs } from '@atoms';
import './style.css'

const WhatsApp = ({style}) => {
	const modal = useSecondModal();
	const [aboutStatus, setAboutUs] = useRecoilState(aboutUs);
	return (
		<div className="whatsapp">
			<div className="whatsapp_header">
			היי :)
			</div>
			<div className="whatsapp_content">
            אנחנו בבלנדס מעניקים שירות מהיר בוואצאפ בין השעות 08:00-19:30 מידי יום למעט שבתות, לשיחה עם נציג פשוט הקליקו למטה ותועברו לשיחת וואצאפ עם אחד מנציגנו, הוא עלול להיות מעט ביישן אז תגידו לו היי
			</div>
			<div className="whatsapp_footer">
				<span 
					onClick={() => {
						setAboutUs('CQ')
						modal('close', 'whatsApp');
						modal('open', 'aboutUs')
					}}
					style={{cursor: "pointer"}}
				>
					לשאלות ותשובות
				</span>
				&nbsp;&nbsp;&nbsp;
				<a
					className="whatsapp_link"
					href="https://wa.me/message/PRRDISOYMEUEB1"
					target="_blank"
					rel="noreferrer"
				>
					תעבירו אותי לוואצאפ
					<img src="/assets/file/images/whatsapp_icon.png" alt=""/>
				</a>
			</div>
		</div>
	);
}

export default WhatsApp;