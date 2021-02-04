const Layout = (props) => {
  return (
    <div>
      <header>Hello</header>
      {props.children}
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
