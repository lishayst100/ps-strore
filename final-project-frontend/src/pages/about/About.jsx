import HeaderAbout from '../../components/imagesAbout/HeaderAbout';
import ImgAbout from '../../components/Lorem/ImgAbout';
import '../../components/Lorem/Lorem.scss'
import WhyYouShould from '../../components/whyYouShould/WhyYouShould';



const About = () => {
  window.scroll(0, 0);
  return (
    <div>
      <h2 className="slide-in-top">About Us</h2>
      <HeaderAbout/>
      <WhyYouShould/>
      <ImgAbout/>
      
    </div>
  );
}

export default About