import { React } from 'react';

import classes from './Backdrop.module.scss';

const BackdropTransparent = (props) => {
  return props.show ? (
    <div
      className={classes.Backdrop}
      onClick={(e) => {
        e.stopPropagation();
        props.updateBackdropState();
      }}
    >
      {props.children}
    </div>
  ) : null;
};

export default BackdropTransparent;
