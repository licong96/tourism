import React from 'react';
import './index.scss';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';

function Index({ props }) {
    console.log(props)

    const handlerOpen = (pathname) => {
        props.history.push({
          pathname
        })
      }

    return (
        <div className="c-nav">
            <IconButton icon={ <i className="iconfont icon-icon--" /> } onClick={() => handlerOpen('/home')} />
            <IconButton icon={ <i className="iconfont icon-ditu" /> } onClick={() => handlerOpen('/map')} />
        </div>
    )
}

export default Index;