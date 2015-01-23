<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Project\Frontend\Index;

/**
 * Description of Index
 *
 * @version $id$
 * @author peter.ho
 */
class Index extends \Hopeter1018\Framework\ManagerModule\Controller\Form
{

    public static function options()
    {
        $result = parent::options();
        return $result;
    }

    public static function save($data)
    {
        
    }

    /**
     * 
     * @return string
     */
    public static function view()
    {
        return 'view';
    }

}
