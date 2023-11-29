const MenuItem = ({item}) => {
  
  const {image, name, price, recpie} = item;

  return (
    <div className="flex items-center space-x-4">
      <img className="w-[120px] rounded-br-[60px] rounded-bl-[60px] rounded-tr-[60px] h-[110px] object-cover" src={image} alt="" />
      <div>
        <h3 className="uppercase">{name} ---------</h3>
        <p>{recpie}</p>
      </div>
      <p className="text-yellow-600">${price}</p>
    </div>
  );
};

export default MenuItem;