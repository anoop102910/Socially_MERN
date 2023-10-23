function ConnectionProfile({ w, src }) {
  return (
    <div>
      {src ? (
        <img className={`w-[${w}] h-[${w}]  object-cover  object-center rounded-full shadow-md`} src={src} alt="" />
      ) : (
        <img className={`w-[${w}] h-[${w}]  object-cover object-center rounded-full shadow-md`} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s" alt="" />
      )}
    </div>
  );
}

export default ConnectionProfile;
