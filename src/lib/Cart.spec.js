import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas running shoes - women',
    price: 35388, // 353.88 | R$ 353,88 -> float nem sempre é exato dentro do JS
  };

  let product2 = {
    title: 'Adidas running shoes - men',
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart(); // garante que antes de cada teste seja criada uma nova e única instância do cart
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal is executed on a newly created instance of Cart', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount ', () => {
      const item = {
        product,
        quantity: 2, // 707765
      };

      cart.add(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list os items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('summary()', () => {
    it('should return an object with the total and the list the items when summary is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });
  });
});
