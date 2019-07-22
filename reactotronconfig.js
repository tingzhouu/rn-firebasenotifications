import Reactotron from 'reactotron-react-native';

console.disableYellowBox = true;

const reactotron = Reactotron
  .configure({ name: 'React Native Demo' })
  // .use(reactotronRedux()) //  <- here i am!
  .connect() //Don't forget about me!

console.log = Reactotron.log;

export default reactotron;

