import { createDrawerNavigator } from '@react-navigation/drawer';
import Speak from '../../../screens/Speak';
import MyVideo from '../../../screens/Video';
import MyAudio from '../../../screens/Audio';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Speak" component={Speak} />
      <Drawer.Screen name="Audio" component={MyAudio} />
      <Drawer.Screen name="Video" component={MyVideo} />
    </Drawer.Navigator>
  );
}