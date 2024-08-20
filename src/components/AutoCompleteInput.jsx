import { useEffect } from 'react';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import { List, ListItem, TextField } from '@mui/material';
import useOnclickOutside from 'react-cool-onclickoutside';
import errorManager from '../utils/errorManager';

const AutocompleteInput = ({ _address, setAddress, setValue }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue: setAutocompleteValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
        defaultValue: _address?.label,
    })

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleSelect = async (address) => {
        try {
            setAutocompleteValue(address, false)
            clearSuggestions()
            const results = await getGeocode({ address })
            const { lat, lng } = getLatLng(results[0])
            _address.label = address
            _address.latitude = lat
            _address.longitude = lng
            setAddress(_address)
        } catch (error) {
            errorManager(error)
        }
    }

    useEffect(() => {
        setAutocompleteValue(_address.label, false);
    }, [_address])
    
    return (
        <div className="w-full relative p-2">
            <TextField
                value={value}
                onChange={(e) => {
                    setAutocompleteValue(e.target.value)
                    setValue('location.label', e.target.value)
                }}
                placeholder="Localisation de l'anomalie"
                width={"100%"}
                disabled={!ready}
            />
            {status === 'OK' && (
                <List
                    ref={ref}
                    sx={{
                        position: 'absolute',
                        zIndex: '1',
                        width: '100%',
                        boxShadow: 'md',
                        borderRadius: 'md',
                        maxHeight: '240px',
                        marginTop: '1',
                        backgroundColor: 'white',
                        border: '1px solid',
                    }}
                >
                {data.map((suggestion, index) => (
                    <ListItem
                        sx={{
                            paddingX: '4',
                            paddingY: '2',
                            borderBottom: '1px solid',
                            borderBottomColor: 'gray',
                            cursor: 'pointer',
                            ":hover": {
                                backgroundColor: 'grey',
                                color: 'white',
                            }
                        }}
                        key={index}
                        onMouseDown={() => handleSelect(suggestion.description)}
                    >
                        {suggestion.description}
                    </ListItem>
                ))}
                </List>
            )}
        </div>
    )
}

export default AutocompleteInput;
