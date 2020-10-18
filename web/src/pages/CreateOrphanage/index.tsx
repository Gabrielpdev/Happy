import React, {
  ChangeEvent, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { FiPlus } from 'react-icons/fi';
import Leaflet, { LeafletMouseEvent } from 'leaflet';
import { FormHandles } from '@unform/core';
import { useTheme } from '../../hooks/themes';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';

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
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

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

  const handleSubmit = useCallback(async ({
    name,
    about,
    instructions,
    opening_hours,
  }: DataProps) => {
    const { latitude, longitude } = position;

    const formData = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        latitude: Yup.number().notOneOf([0], 'Localização é obrigatória').required(),
        longitude: Yup.number().notOneOf([0], 'Localização é obrigatória').required(),
        about: Yup.string().required('Sobre obrigatório'),
        instructions: Yup.string().required('Instruções obrigatórios'),
        opening_hours: Yup.string().required('Horário de atendimento obrigatório'),
        images: Yup.array().min(1, 'Mínimo de 1 foto'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const data = new FormData();

      data.append('name', name);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));
      images.forEach((image) => {
        data.append('images', image);
      });

      await api.post('/orphanages', data);

      // alert('Cadastro realizado com sucesso !');
      history.push('/app');
    } catch (err) {
      const errors = getValidationErros(err);

      formRef.current?.setErrors(errors);

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
      });
    }
  }, [history, images, open_on_weekends, position, addToast]);

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
        <Form onSubmit={handleSubmit} ref={formRef}>
          <fieldset>
            <legend>Dados</legend>

            <span>(Clique no mapa para adicionar uma localização)</span>
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
              <label htmlFor="images">
                Fotos
                <span>(Mínimo de 1 foto)</span>
              </label>

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
