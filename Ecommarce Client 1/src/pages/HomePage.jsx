import Hero from '../components/Hero'
import WhyChooseUs from '../components/WhyChooseUs'
import Categories from '../components/Categories'
import Featured from '../components/Featured'
import Newsletter from '../components/Newsletter'
// import Testimonials from '../components/Testimonials'


export default function HomePage() {

  return (
    <>
      <Hero></Hero>
      <Categories></Categories>
      <Featured></Featured>
      <WhyChooseUs></WhyChooseUs>
      {/* <Testimonials></Testimonials> */}
      <Newsletter></Newsletter>
    </>
  );
}