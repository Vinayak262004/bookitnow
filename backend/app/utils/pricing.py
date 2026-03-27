from flask import current_app


def calculate_totals(price, quantity):
    subtotal = round(float(price) * int(quantity), 2)

    fee_rate = current_app.config.get("BOOKING_FEE_RATE", 0.10)
    tax_rate = current_app.config.get("BOOKING_TAX_RATE", 0.15)

    fees = round(subtotal * fee_rate, 2)
    taxes = round((subtotal + fees) * tax_rate, 2)
    total_amount = round(subtotal + fees + taxes, 2)

    return {
        "subtotal": subtotal,
        "fees": fees,
        "taxes": taxes,
        "total_amount": total_amount,
    }
