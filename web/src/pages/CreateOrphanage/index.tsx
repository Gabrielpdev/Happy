import React, {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import Leaflet, { LeafletMouseEvent } from 'leaflet';
import { useTheme } from '../../hooks/Themes';

import mapMarkerLight from '../../images/map-marker-light.svg';
import mapMarkerDark from '../../images/map-marker-dark.svg';

import SideBar from '../../components/SideBar';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import api from '../../services/api';

import { Container, Form } from './styles';

interface DataProps {
  about: string;
  instructions: string;
  name: string;
  opening_hours: string;
}

export default function CreateOrphanage() {
  const history = useHistory();
  const { theme } = useTheme();
  const [coord, setCoord] = useState({ latitude: 0, longitude: 0 });
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const { latitude, longitude } = response.coords;

        setCoord({ latitude, longitude });
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      },
    );
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => URL.createObjectURL(image));

    setPreviewImages(selectedImagesPreview);
  }, []);

  const handleSubmit = useCallback((inputData: DataProps) => {
    const {
      name,
      about,
      instructions,
      opening_hours,
    } = inputData;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(position.latitude));
    data.append('longitude', String(position.longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach((image) => {
      data.append('images', image);
    });

    api.post('/orphanages', data).then((response) => {
      alert('Cadastro realizado com sucesso !');
      history.push('/app');
    });
  }, [history, images, open_on_weekends, position.latitude, position.longitude]);

  const mapIcon = useMemo(() => Leaflet.icon({
    iconUrl: theme.title === 'light' ? mapMarkerLight : mapMarkerDark,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  }), [theme]);

  return (
    <Container>
      <SideBar />

      <main>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[coord.latitude, coord.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/${theme.title}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <Input name="name" title="Nome" />
            </div>

            <div className="input-block">
              <TextArea name="about" title="Sobre" subtitle="Máximo de 300 caracteres" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => (
                  <img src={image} key={image} alt={image} />
                ))}

                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="images[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <Input name="instructions" title="Instruções" />
            </div>

            <div className="input-block">
              <Input name="opening_hours" title="Horário de funcionamento" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => { setOpenOnWeekends(true); }}>Sim</button>
                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => { setOpenOnWeekends(false); }}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </Form>
      </main>
    </Container>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
