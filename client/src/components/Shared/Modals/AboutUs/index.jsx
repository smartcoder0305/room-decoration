
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import AccessState from "./components/AccessState";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ShipReturn from "./components/ShipReturn";
import CommonQuestion from "./components/CommonQuestion";
import { useRecoilState } from 'recoil'
import { aboutUs } from '@atoms';
import './style.css'

const AboutUs = ({style}) => {
	const modal = useSecondModal();
  const [aboutStatus, setAboutUs] = useRecoilState(aboutUs);
	return (
		<div className="aboutus">
			<div className="aboutus_header">
			תושיגנ תרהצה
			</div>
			<div className="aboutus_content">
				{ aboutStatus === 'AS' && <AccessState />}
				{ aboutStatus === 'PP' && <PrivacyPolicy />}
				{ aboutStatus === 'SR' && <ShipReturn />}
				{ aboutStatus === 'CQ' && <CommonQuestion />}
			</div>
			<div className="aboutus_footer">
				<a onClick={() => {
					modal('close', 'aboutUs')
				}}>אוקי</a>
			</div>
		</div>
	);
}

export default AboutUs;