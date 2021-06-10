const INITIAL_STATES = {
  uid: '',
  age: '',
  name: '',
  city: '',
  token: '',
  image: '',
  email: '',
  number: '',
  country: '',
};

export default function (state = INITIAL_STATES, {type, payload}) {
  switch (type) {
    case 'SAVE_USER':
      return {
        ...state,
        uid: payload.uid ? payload.uid : state.uid,
        age: payload.age ? payload.age : state.age,
        name: payload.name ? payload.name : state.name,
        city: payload.city ? payload.city : state.city,
        token: payload.token ? payload.token : state.token,
        image: payload.image ? payload.image : state.image,
        email: payload.email ? payload.email : state.email,
        number: payload.number ? payload.number : state.number,
        country: payload.country ? payload.country : state.country,
      };

    default:
      return state;
  }
}
