import funnyCaveMan from "../../assets/images/funnyCaveMan.gif";
function About() {
  return (
    <div className=" flex flex-col h-[50vh]  sm:h-[70vh] justify-center items-center ">
      <h1 className="tracking-widest font-extrabold text-5xl">COMING SOON</h1>
      <img src={funnyCaveMan} alt="Funny caveman animation" />
    </div>
  );
}

export default About;
