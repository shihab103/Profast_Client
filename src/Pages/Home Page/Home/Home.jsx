import Banner from "../Banner/Banner";
import ClientLogo from "../ClientLogo/ClientLogo";
import FeatureCards from "../FeatureCards/FeatureCards";
import OurServices from "../OurServices/OurServices";

const Home = () => {
    return (
        <div>
            <Banner/>
            <OurServices/>
            <ClientLogo/>
            <FeatureCards/>
        </div>
    );
};

export default Home;