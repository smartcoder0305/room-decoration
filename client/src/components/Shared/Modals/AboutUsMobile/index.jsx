
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import AccessState from "./components/AccessState";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ShipReturn from "./components/ShipReturn";
import CommonQuestion from "./components/CommonQuestion";
import { useRecoilState } from 'recoil'
import { aboutUs } from '@atoms';
import './style.css'

const AboutUsMobile = ({style}) => {
	const modal = useSecondModal();
	const [aboutStatus, setAboutUs] = useRecoilState(aboutUs);
	return (
		<div className="aboutus_mobile">
			<div className="aboutus_mobile_header">
			תושיגנ תרהצה
			</div>
			<div className="aboutus_mobile_content">
				{ aboutStatus === 'AS' && <AccessState />}
				{ aboutStatus === 'PP' && <PrivacyPolicy />}
				{ aboutStatus === 'SR' && <ShipReturn />}
				{ aboutStatus === 'CQ' && <CommonQuestion />}
			</div>
			<div className="aboutus_mobile_footer">
				<a onClick={() => {
					modal('close', 'aboutUsMobile')
				}}>אוקי</a>
			</div>
		</div>
	);
}

export default AboutUsMobile;