import { Parallax } from 'react-parallax';

const Cover = ({ img, title }) => {

  return (



    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="The Menu"
      strength={-200}
    >
      <div className="hero h-[600px]">
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md bg-black rounded-sm bg-opacity-70">
            <h1 className="mb-5 text-5xl text-white font-bold uppercase">{title}</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>


          </div>
        </div>
      </div>
    </Parallax>




  );
};

export default Cover;