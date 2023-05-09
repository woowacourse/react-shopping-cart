import { Header } from './components/Header';
import { Image as ProductImage } from './components/common/Image';
import { Text as DefaultText } from './components/common/Text';

function App() {
  return (
    <div className="App">
      <Header />
      <DefaultText size={'20px'} weight={'900'} $color={'#193852'}>
        장바구니 텍스트
      </DefaultText>
      <ProductImage
        $width={'282px'}
        $height={'282px'}
        source={
          'https://image.idus.com/image/files/819fc904143c42d3bc973a07a089faff_720.jpg'
        }
        alternative="상품 이미지"
      />
    </div>
  );
}

export default App;
