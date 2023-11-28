import './Home.css';
import homeImg1 from '../img/HomeImage1.jpg'
import homeImg2 from '../img/HomeImage2.jpg'

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <br></br>
          <div className='btnWrapper' class='border-8 border-blue-500'>   
            <a href="/Bikes" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Shop Bikes</a>
            <a class='labeling'> Preimum Brand Bikes For Maximum Comfort </a>
            <img src={homeImg1} className="homeImg" />
          </div>
          <br></br>
          <div className='btnWrapper' class='border-8 border-green-500'>
            <a href="/Misc" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">Shop Acccessories</a>
            <label class='labeling'> Awesome Gears to Enhance Your Riding Experience </label>
            <img src={homeImg2} className="homeImg" />
          </div>
      </header>
    </div>
  );
}

export default Home;