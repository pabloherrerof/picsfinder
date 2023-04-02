export const createFotoLocalStorage = (foto) => {
  const fotosLocalStorage = localStorage.getItem("favorites");
  if (fotosLocalStorage != null) {
    const fotosLocalStorageObject = JSON.parse(fotosLocalStorage); // {data: []}
    fotosLocalStorageObject.data.push(foto);
    const fotosLocalStorageUpdatedEncoded = JSON.stringify(
      fotosLocalStorageObject
    );
    localStorage.setItem("favorites", fotosLocalStorageUpdatedEncoded);
  } else {
    let objectLocalStorage = {
      data: [],
    };
    objectLocalStorage.data.push(foto);
    let fotoLocalStorageUpdatedEncoded = JSON.stringify(objectLocalStorage);
    localStorage.setItem("favorites", fotoLocalStorageUpdatedEncoded);
  }
};

export const readFotoLocalStorage = () => {
  const fotoLocalStorage = localStorage.getItem("favorites");
  if (fotoLocalStorage != null) {
    const fotoLocalStorageObject = JSON.parse(fotoLocalStorage); // {data: []}
    return fotoLocalStorageObject.data;
  }
  return [];
};

export const checkIfExistsFoto = (foto) => {
  let exits = false;
  readFotoLocalStorage().forEach((obj) => {
    if (obj != null) {
      if (obj.id === foto.id) {
        exits = true;
      }
    }
  });
  return exits;
};

export const deleteFotoLocalStorage = (foto) => {
    const fotosLocalStorage = localStorage.getItem('favorites')
    if(fotosLocalStorage !== null){
        const fotosLocalStorageParse = JSON.parse(fotosLocalStorage);
       

        fotosLocalStorageParse.data.forEach(obj => {
           
        })
        let fotosFiltrada = fotosLocalStorageParse.data.filter(obj => obj.id !== foto.foto.id
        )
      
       
            const fotosFiltradasData = {
                data: fotosFiltrada
            } 
        localStorage.setItem('favorites', JSON.stringify(fotosFiltradasData));        
    }
}; 

export const updateItemDescriptionLocalStorage = (foto, newValue) => {
  const fotosOnLocal = readFotoLocalStorage();
  console.log(fotosOnLocal)
  const indexObjectToUpdate = fotosOnLocal.findIndex((obj) => obj.id === foto.id);
  fotosOnLocal[indexObjectToUpdate].description = newValue;
  let objectLocalStorage = {
    data: fotosOnLocal,
  };
  
  
  localStorage.setItem('favorites', JSON.stringify(objectLocalStorage));
}
