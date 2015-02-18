<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Project\Frontend\Index;

use Hopeter1018\Framework\ManagerModule\ManagerConfigure;

/**
 * Description of IndexConfigure
 *
 * @version $id$
 * @author peter.ho
 */
class IndexConfigure extends ManagerConfigure
{

    CONST MANAGER_NAME = 'Index';

    /**
     * {@inheritdoc}
     */
    public static function getDefaultManagerName()
    {
        return static::MANAGER_NAME;
    }

    /**
     * {@inheritdoc}
     */
    public static function getDefaultModuleName()
    {
        return 'my-profile';
    }

    /**
     * {@inheritdoc}
     */
    public static function getEntities()
    {
        return array();
    }

    /**
     * {@inheritdoc}
     */
    public static function getEvents()
    {
        
    }

    /**
     * {@inheritdoc}
     */
    public static function getGuid()
    {
        
    }

}
