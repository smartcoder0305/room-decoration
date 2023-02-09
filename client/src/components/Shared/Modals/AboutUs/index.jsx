
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

	let title = () => {
		if (aboutStatus === 'SR') return 'משלוחים והחזרות';
		if (aboutStatus === 'CQ') return 'שאלות נפוצות';
		if (aboutStatus === 'PP') return 'מדיניות פרטיות';
		if (aboutStatus === 'AS') return 'תושיגנ תרהצה'.split("").reverse().join("");
		return '';
	}
	return (
		<div className="aboutus">
			<div className="aboutus_header">
				{title()}
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