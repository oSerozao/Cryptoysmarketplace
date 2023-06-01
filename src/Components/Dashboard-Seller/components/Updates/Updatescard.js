import React from 'react'

const Updatescard = (props) => {
    const time = Date.now() - props.itemdata.timestamp.toMillis();
    const time0 = time/60000;
    const time1 = time0/24;
    let timeago = parseInt(time1);

  return (
    <div className="update">
            <img src={props.itemdata.productimage} alt="profile" />
            <div className="noti">
              <div  style={{marginBottom: '0.1rem'}}>
                <span> {props.itemdata.info}</span>
              </div>
                <span>{timeago} hours ago</span>
            </div>
          </div>
  )
}

export default Updatescard