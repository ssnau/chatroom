<?php
	/*
	 * ��¼����Action
	 */
	class PortalAction extends ActionClass {
		public static function actDefault(){

		}
		/*
		 * �����¼
		 */
		public static function postLogin(){
			$name = ToolLib::request('username');
			$pw = ToolLib::request('password');

			//�������ݿ�
			$user = new UserEntity();		
			$userArray = $user->getInstanceArray(array('name' => $name, 'password'=>$pw));
			//������Ϊ0�����ʾ�û����������
			if (count($userArray) === 0) {
				echo "error";	
			} else {
				$user = $userArray[0]->data;
				Session::setSession(array('id'=>$user['id'], 'name'=>$user['name'],));
				App::redirect('/chat');
			}
		}
		/*
		 * ����ǳ�
		 */
		public static function actLogout(){
			Session::destory();
			App::redirect('/');
		}
        /*
        * ����ע��
        */
        public static function actReg(){
			$name = ToolLib::request('username');
			$pw = ToolLib::request('password');
			$mspw = ToolLib::request('mspassword');
            
            //TODO
        }
	}
