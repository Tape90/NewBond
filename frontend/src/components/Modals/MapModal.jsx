import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Modal } from "@mui/material";


export default function MapModal({closeMapModal,posts,showMapModal}) {
    return(
        <>
        <Modal 
        open={showMapModal}
        onClose={closeMapModal}>
          <MapContainer center={[51.1657, 10.4515]} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {posts.map((post) => (
              <Marker key={post.id} position={[post.latitude, post.longitude]}>
                <Popup>
                  <h3>{post.title}</h3>
                  <p>{post.location}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Modal>
      
        </>
    )
};