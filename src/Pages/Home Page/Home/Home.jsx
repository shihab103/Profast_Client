import Banner from "../Banner/Banner";
import ClientLogo from "../ClientLogo/ClientLogo";
import FeatureCards from "../FeatureCards/FeatureCards";
import Merchant from "../Merchant/Merchant";
import OurServices from "../OurServices/OurServices";

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogo/>
            <FeatureCards/>
            <Merchant/>
        </div>
    );
};

export default Home;