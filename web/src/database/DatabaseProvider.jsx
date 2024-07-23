import initialize from ".";
import { Provider } from "rxdb-hooks";
import { useEffect, useState } from "react";

const DatabaseProvider = (props) => {
  const [database, setDatabase] = useState()
  useEffect(() => {
    initialize().then(setDatabase);
  }, []);

  return (
    <Provider db={database}>
      { props.children }
    </Provider>
  )
}

export default DatabaseProvider
