import TicketList from "@/views/TicketList.vue";
import Success from '@/views/Success.vue'
import PurchaseTicket from "@/views/PurchaseTicket.vue";
import Booking from '@/views/Booking.vue'


const routes = [
    {
        path: '/ticketlist',
        component: TicketList
    },
    {
        path: '/success',
        component: Success
    },
    {
        path: '/purchaseticket/:id',
        component: PurchaseTicket
    },
    {
        path: '/bookings',
        component: Booking
    }
]


export default routes;