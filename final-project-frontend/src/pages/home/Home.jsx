import Carusel from '../../components/carusel/Carusel';
import Header from '../../components/header/Header';
import ListGames from '../../components/listGames/ListGames'
import WhyYouShould from '../../components/whyYouShould/WhyYouShould';
import './Home.scss'

const Home = () => {

    window.scroll(0, 0);
  return (
    <div className="pt-4 bgc">
      <Header />
      <WhyYouShould/>
      <Carusel />
      <ListGames />
    </div>
  );
}

export default Home