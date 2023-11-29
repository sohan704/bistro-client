

const SectionTitle = ({heading, subHeading}) => {
  console.log(heading, subHeading);

 


  return (
    <div className="text-center mb-10">
       <p className="italic py-5 text-yellow-600">{subHeading}</p>
       <p className="text-2xl py-5 border-b-2 border-t-2  w-3/12 mx-auto">{heading}</p>
    </div>
  );
};

export default SectionTitle;