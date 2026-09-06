'use server'

type OrderFields = 'name' | 'phone' | 'city' | 'quantity'

export type OrderState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<OrderFields, string>>
  /** Echoed back so the form keeps what the visitor typed after a failure. */
  values?: {
    name?: string
    phone?: string
    city?: string
    quantity?: string
    note?: string
  }
}

const MAX_QUANTITY = 50

export async function submitOrder(
  _prev: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const city = String(formData.get('city') ?? '').trim()
  const quantityRaw = String(formData.get('quantity') ?? '').trim()
  const note = String(formData.get('note') ?? '')
    .trim()
    .slice(0, 1000)

  const values = { name, phone, city, quantity: quantityRaw, note }
  const errors: NonNullable<OrderState['errors']> = {}

  if (name.length < 3) {
    errors.name = 'Ad və soyadınızı daxil edin.'
  }

  const phoneDigits = phone.replace(/[^\d]/g, '')
  if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    errors.phone = 'Telefon nömrəsini düzgün daxil edin.'
  }

  if (city.length < 2) {
    errors.city = 'Şəhəri daxil edin.'
  }

  const quantity = Number.parseInt(quantityRaw, 10)
  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_QUANTITY
  ) {
    errors.quantity = `Sifariş sayı 1 və ${MAX_QUANTITY} arasında olmalıdır.`
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values }
  }

  try {
    // Orders are currently recorded server-side. Connect a database or a
    // notification channel here to persist and route them.
    console.log('[order] New order request:', {
      name,
      phone: phoneDigits,
      city,
      quantity,
      note,
      receivedAt: new Date().toISOString(),
    })

    return {
      status: 'success',
      message: 'Yaxın zamanda sizinlə əlaqə saxlanılacaq.',
    }
  } catch {
    return {
      status: 'error',
      message:
        'Hazırda müraciəti göndərmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.',
      values,
    }
  }
}
