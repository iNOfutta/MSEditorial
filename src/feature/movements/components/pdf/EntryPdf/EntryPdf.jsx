import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import Merriweather from '../../../../../assets/fonts/Merriweather/Merriweather-Light.ttf';
import MerriweatherItalic from '../../../../../assets/fonts/Merriweather/Merriweather-LightItalic.ttf';
import MerriweatherBold from '../../../../../assets/fonts/Merriweather/Merriweather-Bold.ttf';
// Register font
Font.register({
  family: 'Merriweather',
  fonts: [
    { src: Merriweather }, // font-style: normal, font-weight: normal
    { src: MerriweatherItalic, fontStyle: 'italic' },
    { src: MerriweatherBold, fontWeight: 'bold' },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 25,
    fontSize: 8,
    fontFamily: 'Merriweather',
  },
  date: {
    marginBottom: 20,
  },
  publisherData: {
    flexDirection: 'row',
    gap: 20,
  },
  publisherLogo: {
    width: '100%',
  },
  bookListHeader: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#E6E6E6',
    fontWeight: 'extrabold',
    padding: 4,
  },
  bookList: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
    borderBottom: 1,
    borderBottomColor: '#E6E6E6',
    paddingBottom: 2,
  },
  bookListTotal: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
    borderBottom: 1,
    borderBottomColor: '#E6E6E6',
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  bookTitle: {
    width: '30%',
  },
  bookIsbn: {
    width: '15%',
  },
  bookItems: {
    width: '9%',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  credits: {
    fontSize: 6,
    color: '#E6E6E6',
    marginTop: 20,
  },
});

// Create Document Component
const EntryPdf = ({
  publisher, logo, pubId, internalId, date, books, total,
}) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.publisherData}>
        <View style={{ width: '10%' }}>
          <Image src={logo} style={styles.publisherLogo} />
        </View>
        <View>
          <Text>{publisher.name}</Text>
          <Text>{pubId.type}: {pubId.number}</Text>
          <Text>Dirección: {publisher.address}</Text>
          <Text>Teléfono: {publisher.phone}</Text>
          <Text>Correo electrónico: {publisher.email}</Text>
        </View>
      </View>
      <Text style={styles.header}>Ingreso de ejemplares</Text>
      <Text>Ingreso No. {internalId}</Text>
      {/* <Text>Descuento:</Text> */}
      <View style={styles.bookListHeader}>
        <Text style={styles.bookTitle}>Título</Text>
        <Text style={styles.bookIsbn}>ISBN</Text>
        <Text style={styles.bookItems}>Cantidad</Text>
        <Text style={styles.bookItems}>PVP</Text>
        <Text style={styles.bookItems}>Subtotal</Text>
        <Text style={styles.bookItems}>Descuento</Text>
        <Text style={styles.bookItems}>Total</Text>
      </View>
      {books && Array.isArray(books)
        ? books.map((book) => (
          <View key={book.id} style={styles.bookList}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookIsbn}>{book.isbn}</Text>
            <Text style={styles.bookItems}>{book.copies}</Text>
          </View>
        ))
        : null}
      <View style={styles.bookListTotal}>
        <Text style={styles.bookTitle}>TOTAL: ${total.toLocaleString()}</Text>
        <Text style={styles.bookIsbn} />
        <Text style={styles.bookItems} />
        <Text style={styles.bookItems} />
        <Text style={styles.bookItems} />
        <Text style={styles.bookItems} />
        <Text style={styles.bookItems} />
      </View>
      <Text style={styles.credits}>Documento generado por Caikei</Text>
    </Page>
  </Document>
);

EntryPdf.propTypes = {
  publisher: PropTypes.shape(
    {
      name: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    },
  ).isRequired,
  logo: PropTypes.string.isRequired,
  pubId: PropTypes.shape(
    {
      type: PropTypes.string,
      number: PropTypes.string,
      isbn: PropTypes.number,
      copies: PropTypes.number,
    },
  ).isRequired,
  internalId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string,
        title: PropTypes.string,
      },
    ),
  ).isRequired,
  total: PropTypes.number.isRequired,
};
export default EntryPdf;
