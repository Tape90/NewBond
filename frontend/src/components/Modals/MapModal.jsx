import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Modal } from "@mui/material";
import 'leaflet/dist/leaflet.css';


export default function MapModal({closeMapModal,posts,showMapModal}) {
    return(
        <>
        <Modal
        sx={{
          width: "80vw",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        open={showMapModal}
        onClose={closeMapModal}>
          <MapContainer center={[51.4792732, 7.2032233]} zoom={10} style={{ height: '100%', width: '100%'}} scrollWheelZoom={false}>
            <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            iconUrl="../../../public/icons/marker-icon.png"
            iconRetinaUrl="../../../public/icons/marker-icon-2x.png"
            shadowUrl="../../../public/icons/marker-shadow.png" />
            {posts.map((post) => (
              
              <Marker key={post.id} position={[post.latitude, post.longitude]}>
                <Popup>
                  <h3>{post.title}</h3>
                  <p>{post.place}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Modal>
      
        </>
    )
};