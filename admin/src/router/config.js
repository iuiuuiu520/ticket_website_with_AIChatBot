import Center from "@/views/center/Center.vue";
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import PathAdd from '@/views/path-manage/PathAdd.vue'
import PathList from '@/views/path-manage/PathList.vue'
import CompanyList from '@/views/company/CompanyList.vue'
import CompanyAdd from '@/views/company/CompanyAdd.vue'
import TicketAdd from '@/views/ticket-manage/TicketAdd.vue'
import TicketList from '@/views/ticket-manage/TicketList.vue'

const routes = [
    {
        path: '/center',
        component: Center,
        meta: { isAuth: true }
    },
    {
        path: '/user-manage/adduser',
        component: UserAdd,
        meta: { isAuth: true }
    },
    {
        path: '/user-manage/userlist',
        component: UserList,
        meta: { isAuth: true }
    },
    {
        path: '/path-manage/addpath',
        component: PathAdd,
        meta: { isAuth: true }
    },
    {
        path: '/path-manage/pathlist',
        component: PathList,
        meta: { isAuth: true }
    },
    {
        path: '/company-manage/companylist',
        component: CompanyList,
        meta: { isAuth: true }
    },
    {
        path: '/company-manage/addcompany',
        component: CompanyAdd,
        meta: { isAuth: true }
    },
    {
        path: '/ticket-manage/addticket',
        component: TicketAdd,
        meta: { isAuth: true }
    },
    {
        path: '/ticket-manage/ticketlist',
        component: TicketList,
        meta: { isAuth: true }
    }
]


export default routes;