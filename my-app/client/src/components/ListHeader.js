import Modal from './Modal'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const ListHeader = ({ listName, getData }) => {


  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>ADD NEW</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  )
}

export default ListHeader