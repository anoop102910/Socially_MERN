function CardLoader() {
    return (
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full loader"></div>
          <div className="text-gray-500 ml-6 h-7 w-40 rounded-md loader"></div>
        </div>
        <div className="text-gray-500 ml-6 h-7 w-20 rounded-md loader"></div>
      </div>
    );
  }
  
  export default function UserLoader(){
    return (
      <>
        <div className="bg-white test:bg-dark-200 rounded-md p-4 mt-3 shadow-md w-[550px] appear-animation">
          <h2 className="text-black">Friends</h2>
          <hr className="my-3" />
          <div >
            <ul>
              {(() => {
                const items = [];
  
                for (let i = 0; i < 5; i++) {
                  items.push(<li key={i}>{<CardLoader key={i} />}</li>);
                }
                return items;
              })()}
            </ul>
          </div>
        </div>
      </>
    );
  }
  
  