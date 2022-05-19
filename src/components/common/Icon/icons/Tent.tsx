function Tent(props) {
  return (
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 18.75L18.75 25M23.75 25L12.5 5L23.75 25ZM6.25 25L17.5 5L6.25 25ZM3.75 25H26.25H3.75ZM15 18.75L11.25 25L15 18.75Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Tent;
