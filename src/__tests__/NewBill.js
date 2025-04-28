/**
 * @jest-environment jsdom
 */

import {screen} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import userEvent from "@testing-library/user-event";
import newBillData from "../__mocks__/newBillData.js";
import mockStore from "../__mocks__/store.js";
import {ROUTES} from "../constants/routes.js";

jest.mock("../app/Store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then I can POST a new bill", async () => {
      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      const store = mockStore;
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "a@a" }));

      new NewBill({ document, onNavigate, store, localStorage })

      userEvent.selectOptions(screen.getByTestId("expense-type"),newBillData.kind);
      userEvent.type(screen.getByTestId("expense-name"),newBillData.name);
      userEvent.type(screen.getByTestId("datepicker"),newBillData.date);
      userEvent.type(screen.getByTestId("amount"),newBillData.amount);
      userEvent.type(screen.getByTestId("vat"),newBillData.vat);
      userEvent.type(screen.getByTestId("pct"),newBillData.vatRate);
      userEvent.type(screen.getByTestId("commentary"), newBillData.comment);
      await userEvent.upload(screen.getByTestId("file"), newBillData.file);

      const submitBtn = screen.getByText("Envoyer");
      userEvent.click(submitBtn);

      //I should return to the Bills page
      expect(screen.getByTestId("btn-new-bill")).toBeTruthy();
    })
  })
})
